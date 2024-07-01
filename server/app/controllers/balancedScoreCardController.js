"use strict"

const pool = require("../DBconnection");
const Company = require('../model/Company')
const moment = require('moment');

const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const Kpis = require("../model/Kpis");
const BalancedScoreCard = require("../model/BalancedScoreCard");
const ScoreCardKpi = require("../model/ScoreCardKpi")

exports.addBalancedScoreCard = catchAsyncFunction(async (req, res) => {
    // Input validation
    const { name, fiscal_year, company_id } = req.body;
    if (!(name && fiscal_year && company_id)) {
        return res.status(401).json({ success: false, error: "Please fill all the credentials" });
    }

    try {
        // Retrieve company details
        const companyDetails = await Company.findById(company_id);
        if (!companyDetails) {
            return res.status(404).json({ success: false, error: "Company not found" });
        }

        // Calculate start and end dates
        const financialYearStart = companyDetails.financialYearstart;
        const financialYearend = companyDetails.financialYearend;
        const startMonth = new Date(`${financialYearStart} 1, ${fiscal_year}`);
        const startDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
        const endMonth = new Date(`${financialYearend} 1, ${fiscal_year}`);
        const endDate = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0); // Last day of the month

        // Date validation
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid financial year dates" });
        }

        // Date formatting
        const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
        const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;

        // Create plan object
        const BalancedScore = new BalancedScoreCard({
            name,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            company_id,
        });

        // Save plan
        await BalancedScore.save();

        // Return success message
        res.json({ success: true, message: "Balanced Score card added successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Some error occurred while creating user" });
    }
});



exports.getBalancedScoreCard = catchAsyncFunction(async (req, res) => {
    // Input validation
    const { id } = req.params;
    if (!(id)) {
        return res.status(401).json({ success: false, error: "Please fill all the credentials" });
    }

    try {
        // Retrieve company details
        const companyDetails = await Company.findById(id);
        if (!companyDetails) {
            return res.status(404).json({ success: false, error: "Company not found" });
        }

        const BalancedScore = await BalancedScoreCard.find({ company_id: id });


        // Return success message
        res.json({ success: true, data: BalancedScore, message: "Balanced Score card fetched successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Some error occurred while creating user" });
    }
});



exports.addScorCardKpi = catchAsyncFunction(async (req, res) => {
    if (!(req.body.scoreCardId && req.body.kpi_id)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" });
    } else {

        for (const element of req.body.kpi_id) {
            const kpi = await Kpis.findById(element);
            const plankpi = await ScoreCardKpi.find({
                $and: [
                    { 'kpi_id': element },
                    { 'scoreCardId': req.body.scoreCardId }
                ]
            });

            if (plankpi.length === 0) {
                const user = new ScoreCardKpi({
                    scoreCardId: req.body.scoreCardId,
                    kpi_id: element,
                    kpi_title: kpi.title,
                    kpi_type: kpi.Kpi_type // Assign kpi_type here
                });

                try {
                    await user.save();
                } catch (err) {
                    return res.status(500).send({
                        'success': false,
                        message: err.message || "Some error occurred while creating user"
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            message: "Score Card Kpis assigned successfully!"
        });
    }
});



exports.getScorCardKpi = catchAsyncFunction(async (req, res) => {
    const { id } = req.params;
    if (!(id)) {
        return res.status(401).json({ success: false, error: "Please fill all the credentials" });
    }
    else {
        const plankpi = await ScoreCardKpi.find({ 'scoreCardId': id });
        res.status(200).json({
            success: true,
            data: plankpi,
            message: "Score Card Kpis fetched successfully!"
        });
    }
});


exports.updateScoreCardKpi = catchAsyncFunction(async (req, res) => {
    if (!(req.body.scoreCardId && req.body.kpi_id)) {
        return res.status(401).json({ 'success': false, error: "please fill all the credentials" });
    } else {
        const plan_kpi_check = await ScoreCardKpi.find({ scoreCardId: req.body.scoreCardId });
        if (plan_kpi_check.length > 0) {
            await ScoreCardKpi.deleteMany({ scoreCardId: req.body.scoreCardId });
        }

        for (const element of req.body.kpi_id) {
            const kpi = await Kpis.findById(element);
            const plankpi = await ScoreCardKpi.find({
                $and: [
                    { 'kpi_id': element },
                    { 'scoreCardId': req.body.scoreCardId }
                ]
            });

            if (plankpi.length === 0) {
                const user = new ScoreCardKpi({
                    scoreCardId: req.body.scoreCardId,
                    kpi_id: element,
                    kpi_title: kpi.title,
                    kpi_type: kpi.Kpi_type // Assign kpi_type here
                });

                try {
                    await user.save();
                } catch (err) {
                    return res.status(500).send({
                        'success': false,
                        message: err.message || "Some error occurred while creating user"
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            message: "score Card Kpis assigned successfully!"
        });
    }
});



exports.deleteScoreCard = catchAsyncFunction(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ success: false, error: "Please fill all the credentials" });
    } else {
        try {
            await BalancedScoreCard.findOneAndDelete({ _id: id });
            await ScoreCardKpi.deleteMany({ scoreCardId: id });

            res.status(200).json({
                success: true,
                message: "Score Card deleted successfully!"
            });
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
});