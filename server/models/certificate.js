const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    student_name:{
        type: String,
        required: true
    },
    student_id:{
        type: String,
        required: true
    },
    student_email:{
        type: String,
        required: true
    },
    course_name:{
        type: String,
        required: true
    },
    starting_date:{
        type: String,
        required: true
    },
    ending_date:{
        type: String,
        required: true
    },
    certificate_id:{
        type: String,
        required: true
    },
    certificate_url:{
        type: String,
        required: true
    },
    proof_work:{
        type: String,
        required: true
    }
});

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;