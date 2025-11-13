const UserRepository = require('../repositories/UserRepository');

const adminMiddleware = async (req, res, next) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;
        
        // Fetch user from database
        const user = await UserRepository.findById(userId);
        
        // Check if user exists and has admin privileges
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        
        // Attach user to request for further use
        req.admin = user;
        next();
    } catch (err) {
        console.error('Admin middleware error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = adminMiddleware;