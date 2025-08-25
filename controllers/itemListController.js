const { pool } = require('../DB/configDb');
const {
    ADDITEM,
    GETITEMS_BY_USER,
    DELETEITEMS_BY_USER
} = require('../schemas/toBuySchemas');

exports.createToBuyItemController = async (req, res) => {
    const { item_name } = req.body;
    const userData = req.user.username;

    if (!item_name || item_name.trim() === "") {
        return res.status(400).json({
            message: 'Item name is required',
            error: 'VALIDATION_ERROR'
        });
    }

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
        const result = await pool.query(GETITEMS_BY_USER, [userData]);
        res.status(200).json({
            message: 'Items fetched successfully',
            count: result.rowCount,
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

exports.deleteItemController = async (req, res) => {
    const { item_id } = req.body
    const userData = req.user.username;

    if (!item_id || isNaN(item_id)) {
        return res.status(400).json({
            message: 'Invalid item id',
            error: 'VALIDATION_ERROR'
        });
    }

    try {
        const result = await pool.query(DELETEITEMS_BY_USER, [item_id, userData]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Item not found or not owned by user',
                error: 'NOT_FOUND'
            });
        }
        
        res.status(200).json({
            message: 'Item delete successfully',
        });
    }
    catch (error) {
        console.error('Delete Items error:', error);
        res.status(500).json({
            message: 'Internal Server Error.',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
}