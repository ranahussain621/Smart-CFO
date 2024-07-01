"use strict"

const pool = require("../DBconnection");
const Kpis = require('../model/Kpis')
const UserModel = require('../model/users')

const catchAsyncFunction = require('../middlewares/catchAsyncFun');

// Add a single KPI
exports.addKpi = catchAsyncFunction(async(req, res) => {
    const { title, Kpi_type } = req.body;

    // Validate title and Kpi_type
    if (!title || typeof title !== 'string' || !Kpi_type || typeof Kpi_type !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Invalid request. 'title' and 'Kpi_type' must be non-empty strings.",
        });
    }

    // Check if a KPI with the same title already exists
    const existingKpi = await Kpis.findOne({ title });
    if (existingKpi) {
        return res.status(400).json({
            success: false,
            message: "A KPI with the same title already exists.",
        });
    }

    // Create a new Kpi instance
    const kpi = new Kpis({
        title,
        Kpi_type,
    });

    // Save the KPI to the database
    try {
        const savedKpi = await kpi.save();
        res.json({
            success: true,
            message: "KPI added successfully!",
            Kpi: savedKpi,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to add KPI.",
        });
    }
});

exports.getKpis = catchAsyncFunction(async (req, res) => {
    try {
        const kpis = await Kpis.aggregate([
            {
                $group: {
                    _id: "$Kpi_type", // Group by the Kpi_type field
                    kpis: { $push: "$$ROOT" } // Push the entire document into an array
                }
            }
        ]);
        
        // Rename _id to type for better readability in the output
        const formattedKpis = kpis.map(({ _id, kpis }) => ({ type: _id, kpis }));
        
        res.status(200).json({
            success: true,
            data: formattedKpis,
            message: "KPIs fetched successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

exports.DeleteKpi = catchAsyncFunction(async(req, res) => {
    try {
        console.log('123');
         await Kpis.findOneAndDelete({_id:req.body.id});
        res.json({
            success: true,
            message: "Kpis deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})