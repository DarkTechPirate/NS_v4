const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const User = require('./models/userModel');
const Vendor = require('./models/vendorModel');
const connectMongo = require('./config/connectMongo');

async function test() {
    await connectMongo();
    
    // Find any user
    const user = await User.findOne();
    console.log("Found user:", user._id);
    
    try {
        const vendor = new Vendor({
            ownerId: user._id,
            name: "deva",
            category: "gay",
            priceRate: "69",
            location: "gay town",
            description: "Im gay",
        });
        await vendor.save();
        console.log("Vendor saved successfully");
        
        user.role = "vendor";
        user.onboardingComplete = true;
        user.roleModel = 'Vendor';
        user.roleSpecificId = vendor._id;
        
        await user.save();
        console.log("User updated successfully");
        
    } catch (err) {
        console.error("Error occurred:", err.message);
        if (err.errors) {
            console.error(err.errors);
        }
    }
    
    process.exit(0);
}

test();
