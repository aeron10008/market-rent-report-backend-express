const express = require('express');
const request = require('request');
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/details', async (req, res) => {
    const options = {
        url: `${process.env.SERVER_URL}details?province=${req.query.province}&city=${req.query.city}&address=${req.query.address}`,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    };

    const data = await request.get(options, (error, response) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(response.body);
    });
});

router.get('/offerrent', async (req, res) => {
    const options = {
        url: `${process.env.SERVER_URL}property/offerrent?province=${req.query.province}&city=${req.query.city}&address=${req.query.address}&noBedrooms=${req.query.noBedrooms}&typeOfDwelling=${req.query.typeOfDwelling}`,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    };

    const data = await request.get(options, (error, response) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(response.body);
    });
});

router.get('/google-maps-api-find-address', async (req, res) => {
    const options = {
        url: `${process.env.GOOGLE_MAPS_API_URL_FIND_ADDRESS}input=${req.query.key}&types=address&components=country%3ACA&locationbias=${req.query.location}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.GOOGLE_MAPS_API_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    };

    const data = await request.get(options, (error, response) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(response.body);
    });
});

router.get('/google-maps-api-get-province-location', async (req, res) => {
    const options = {
        url: `${process.env.GOOGLE_MAPS_API_URL_GET_PROVINCE_LOCATION}address=${req.query.key},+Canada&key=${process.env.GOOGLE_MAPS_API_KEY}`,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.GOOGLE_MAPS_API_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    };

    const data = await request.get(options, (error, response) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(response.body);
    });
});

router.post('/send-mail', async (req, res) => {
    const { to, subject, html } = req.body;

    if (process.env.MAIL_MAILER == 'smtp') {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject,
                html
            });
            res.json('Thank you, we have emailed the report to the address provided.');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json();
        }
    }
});

module.exports = router;