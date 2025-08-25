const { pool } = require('../DB/configDb');
const {
    ADDITEM,
    GETITEMS_BY_USER
} = require('../schemas/toBuySchemas');

exports.createToBuyItemController = async (req, res) => {
    const { item_name } = req.body;
    const userData = req.user.username;
    try {
        await pool.query(ADDITEM, [item_name, userData])
        res.status(200).json({
            message: 'Item created successfully',
            data: {
                item_name,
                userData
            }
        });
    } catch (error) {
        console.error('Create Item error:', error);
        res.status(500).json({
            message: 'Internal Server Error.',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
}

exports.getItemsController = async (req, res) => {
    try {
        const userData = req.user.username;
        const result = await pool.query(GETITEMS_BY_USER,[userData]);
        res.status(200).json({
            message: 'Items fetched successfully',
            data: result.rows
        });
    }
    catch (error) {
        console.error('Get Items error:', error);
        res.status(500).json({
            message: 'Internal Server Error.',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
}