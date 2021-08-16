$('.footer-logo-extension').hide(); 
$('.web-form-actions').hide();
$('.btn-login-area').hide();
$('.ml-2').hide();
$('.section-head').css({"font-size":"13px","font-weight":"normal"});

//value = frappe.web_form.get_value(do_you_provide_remote_simultaneous_conference_interpretation); 
frappe.web_form.on('do_you_provide_remote_simultaneous_conference_interpretation', (field, value) => { 
    console.log("inside the form") 
    $('.ml-2').hide();
    if (value=="No") { 
        $('.ml-2').hide();
        frappe.msgprint(__('Thank you for your interest in working with us. We are currently looking for interpreters with experience in remote simultaneous conference interpretation.')); 
        field.set_value(0);
        
    }
    if (value=="Yes"){
        $('.ml-2').show();
    }
});

$('#terms').click(function (){
var content;
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            'doctype': 'Terms and Conditions',
            'fields': ['terms'],
            'filters': {
                "title" : "Terms & Conditions"
            }
        },
        async: false,
        callback: function(r) {
            if (r.message.length > 0) {
                content = r.message[0].terms;
                let d = new frappe.ui.Dialog({
                    title: 'Terms and Conditions',
                    fields: [
                    {
                        fieldname: 'terms_content',
                        fieldtype: 'Text',
                        read_only: 1,
                        default: ''
                    }],
                    primary_action_label: 'I agree',
                    primary_action(values) {
                        frappe.web_form.set_value('agreement',1)
                        console.log("this is the result",frappe.web_form.get_value('agreement'))
                        d.hide();
                    }
            });
            d.show();
            d.set_value("terms_content",content)
            }
        }
    });
    
});

frappe.web_form.after_save = () => {
    window.location.reload(); 
}
var fields = {
    "First Name": "supplier_name",
    "Supplier Group": "supplier_group",
    "Supplier Type": "supplier_type",
    "Last Name": "last_name",
    "Email": "email",
    "Qualification": "qualify",
    "University Name": "university_name",
    "Year of completion": "year_of_completion",
    "Days of Conference Interpreting Experience": 
    "days_of_conference_interpreting_experience",
    "Time Zone of Operation": "time_zone_of_operation",
    "Name - Reference 1": "name_",
    "Email ID - Reference 1": "email_id",
    "Phone Number - Reference 1": "phone_number",
    "Name - Reference 2": "name_reference2",
    "Email - Reference 2": "email_reference2",
    "Phone - Reference 2": "phone_reference2",
    "Name - Reference 3": "name_reference3",
    "Email ID - Reference 3": "email_reference3",
    "Phone Number - Reference 3": "phone_reference3",
    "Technical Experience on Platform": "technical_experience_on_platform",
    "USB Headset": "usb_headset",
    "No. of Screens": "screens",
    "UPS": "ups_",
    "Working Environment": "working_environment",
    "Speed Test Result": "speed_test_result",
    "Recorded/Live Meeting Rate-1hr": "a1",
    "Rate if Content is Technical in Nature-1hr": "a2",
    "Rate if Rehearsal Prior to Event Day-1hr": "a3",
    "Charges for the Training-1hr": "a4",
    "Over Time Rate-1hr": "a5",
    "Any Minimum rate-1hr": "a6",
    "Retainer-1hr": "a7",
    "Any Other Additional Price Component-1hr": "a8",
    "Recorded/Live Meeting Rate-2hr": "b1",
    "Rate if Content is Technical in Nature-2hr": "b2",
    "Rate if Rehearsal Prior to Event Day-2hr": "b3",
    "Charges for the Training-2hr": "b4",
    "Over Time Rate-2hr": "b5",
    "Any Minimum rate-2hr": "b6",
    "Retainer-2hr": "b7",
    "Any Other Additional Price Component-2hr": "b8",
    "Recorded/Live Meeting Rate-3hr": "c1",
    "Rate if Content is Technical in Nature-3hr": "c2",
    "Rate if Rehearsal Prior to Event Day-3hr": "c3",
    "Charges for the Training-3hr": "c4",
    "Over Time Rate-3hr": "c5",
    "Any Minimum rate-3hr": "c6",
    "Retainer-3hr": "c7",
    "Any Other Additional Price Component-3hr": "c8",
    "Recorded/Live Meeting Rate-4hr": "d1",
    "Rate if Content is Technical in Nature-4hr": "d2",
    "Rate if Rehearsal Prior to Event Day-4hr": "d3",
    "Charges for the Training-4hr": "d4",
    "Over Time Rate-4hr": "d5",
    "Any Minimum rate-4hr": "d6",
    "Retainer-4hr": "d7",
    "Any Other Additional Price Component-4hr": "d8",
    "Recorded/Live Meeting Rate-5hr": "e1",
    "Rate if Content is Technical in Nature-5hr": "e2",
    "Rate if Rehearsal Prior to Event Day-5hr": "e3",
    "Charges for the Training-5hr": "e4",
    "Over Time Rate-5hr": "e5",
    "Any Minimum rate-5hr": "e6",
    "Retainer-5hr": "e7",
    "Any Other Additional Price Component-5hr": "e8",
    "Recorded/Live Meeting Rate-6hr": "f1",
    "Rate if Content is Technical in Nature-6hr": "f2",
    "Rate if Rehearsal Prior to Event Day-6hr": "f3",
    "Charges for the Training-6hr": "f4",
    "Over Time Rate-6hr": "f5",
    "Any Minimum rate-6hr": "f6",
    "Retainer-6hr": "f7",
    "Any Other Additional Price Component-6hr": "f8",
    "Recorded/Live Meeting Rate-7hr": "g1",
    "Rate if Content is Technical in Nature-7hr": "g2",
    "Rate if Rehearsal Prior to Event Day-7hr": "g3",
    "Charges for the Training-7hr": "g4",
    "Over Time Rate-7hr": "g5",
    "Any Minimum rate-7hr": "g6",
    "Retainer-7hr": "g7",
    "Any Other Additional Price Component-7hr": "g8",
    "Recorded/Live Meeting Rate-Full day": "h1",
    "Rate if Content is Technical in Nature-Full Day": "h2",
    "Rate if Rehearsal Prior to Event Day-Full Day": "h3",
    "Charges for the Training-Full Day": "h4",
    "Over Time Rate-Full Day": "h5",
    "Any Minimum rate-Full Day": "h6",
    "Retainer-Full Day": "h7",
    "Any Other Additional Price Component-Full Day": "h8",
    "Upload your CV": "upload_your_cv"
  };

frappe.web_form.validate = () => {
    const error = []
    for (let i in fields){
        y = fields[i];
        if(!(frappe.web_form.get_value(y))){
            error.push(i);
        }
    }
    if (!(frappe.web_form.get_value('option1')) && !(frappe.web_form.get_value('option2')) && !(frappe.web_form.get_value('option3')) && !(frappe.web_form.get_value('holiday_')) ) {
        error.push("Time Availability Slot.");
    }
    if (!(frappe.web_form.get_value('aiic')) && !(frappe.web_form.get_value('vkd')) && !(frappe.web_form.get_value('atc')) && !(frappe.web_form.get_value('iti')) && !(frappe.web_form.get_value('other_memberships'))) {
        error.push("Professional Membership.");
    }
    if (!(frappe.web_form.get_value('trainingeducation')) && !(frappe.web_form.get_value('businessfinancial')) && !(frappe.web_form.get_value('general')) && !(frappe.web_form.get_value('it')) && !(frappe.web_form.get_value('tourismtravel')) && !(frappe.web_form.get_value('marketing')) && !(frappe.web_form.get_value('technicalengineering')) && !(frappe.web_form.get_value('other_specialisation'))) {
        error.push("Areas of Specialization.");
    }
    if (!(frappe.web_form.get_value('frenchenglish')) && !(frappe.web_form.get_value('italianenglish')) && !(frappe.web_form.get_value('bengalienglish')) && !(frappe.web_form.get_value('urduenglish')) && !(frappe.web_form.get_value('marathienglish')) && !(frappe.web_form.get_value('tamilenglish')) && !(frappe.web_form.get_value('gujaratienglish')) && !(frappe.web_form.get_value('japaneseenglish')) && !(frappe.web_form.get_value('russianenglish')) && !(frappe.web_form.get_value('mandarinenglish')) && !(frappe.web_form.get_value('koreanenglish')) && !(frappe.web_form.get_value('indonesianenglish')) && !(frappe.web_form.get_value('vietnameseenglish')) && !(frappe.web_form.get_value('japaneseenglish')) && !(frappe.web_form.get_value('thaienglish')) && !(frappe.web_form.get_value('burmeseenglish')) && !(frappe.web_form.get_value('javaneseenglish')) && !(frappe.web_form.get_value('arabicenglish')) && !(frappe.web_form.get_value('portugueseenglish')) && !(frappe.web_form.get_value('germanenglish')) && !(frappe.web_form.get_value('spanishenglish')) && !(frappe.web_form.get_value('turkishenglish')) && !(frappe.web_form.get_value('hindienglish')) && !(frappe.web_form.get_value('other_lang'))) {
        error.push("Language Pair.");
    }
    if (!(frappe.web_form.get_value('yes_')) && !(frappe.web_form.get_value('no_'))) {
        error.push("Wired Internet.");
    }
    if (error.length>0){
        frappe.msgprint(error);
        return false;
    }
    
    return true;
    
}

