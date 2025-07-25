const express = require('express');
const UserService = require('../services/userService.js');
const { requireUser } = require('./middleware/auth.js');
const User = require('../models/User.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth.js');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('=== LOGIN REQUEST ===');
  console.log('Request body:', req.body);
  
  const sendError = msg => {
    console.log('Login error:', msg);
    return res.status(400).json({ message: msg });
  };
  
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError('Email and password are required');
  }

  console.log('Attempting to authenticate user with email:', email);
  
  try {
    const user = await UserService.authenticateWithPassword(email, password);
    console.log('Authentication result:', user ? 'SUCCESS' : 'FAILED');

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();
      console.log('Login successful for user:', email);
      return res.json({...user.toObject(), accessToken, refreshToken});
    } else {
      return sendError('Email or password is incorrect');
    }
  } catch (error) {
    console.error('Login error:', error);
    return sendError('Login failed');
  }
});

router.post('/register', async (req, res, next) => {
  console.log('=== REGISTER REQUEST ===');
  console.log('Request body:', req.body);
  
  if (req.user) {
    return res.json({ user: req.user });
  }
  try {
    console.log('Creating user with data:', req.body);
    const user = await UserService.create(req.body);
    console.log('User created successfully:', user.email);

    // Generate access token for the newly registered user
    const accessToken = generateAccessToken(user);
    console.log('Generated access token for new user');

    const response = { ...user.toObject(), accessToken };
    console.log('Sending registration response:', { email: response.email, hasAccessToken: !!response.accessToken });
    
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error while registering user: ${error}`);
    return res.status(400).json({ message: error.message || 'Registration failed' });
  }
});

router.post('/logout', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.status(200).json({ message: 'User logged out successfully.' });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token is required'
    });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user
    const user = await UserService.get(decoded.sub);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Update user's refresh token in database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Return new tokens
    return res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error(`Token refresh error: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        message: 'Refresh token has expired'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

router.get('/me', requireUser, async (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = router;