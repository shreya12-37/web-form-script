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
var myurl = 'api/resource/doctypename'
    $.ajax({
        type: 'GET', 
	    url: myurl,
        success: function(result) {
            content = result.data.terms;
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
            console.log("this is the result",content)
        }
    });
    
});

frappe.web_form.after_save = () => {
    window.location.reload(); 
}

frappe.web_form.validate = () => {
    if (!(frappe.web_form.get_value('option1')) && !(frappe.web_form.get_value('option2')) && !(frappe.web_form.get_value('option3')) && !(frappe.web_form.get_value('holiday_')) ) {
        frappe.msgprint('Select time availability slot.');
        return false;
    }
    if (!(frappe.web_form.get_value('aiic')) && !(frappe.web_form.get_value('vkd')) && !(frappe.web_form.get_value('atc')) && !(frappe.web_form.get_value('iti')) && !(frappe.web_form.get_value('other_memberships'))) {
        frappe.msgprint('Select atleast one membership.');
        return false;
    }
    if (!(frappe.web_form.get_value('trainingeducation')) && !(frappe.web_form.get_value('businessfinancial')) && !(frappe.web_form.get_value('general')) && !(frappe.web_form.get_value('it')) && !(frappe.web_form.get_value('tourismtravel')) && !(frappe.web_form.get_value('marketing')) && !(frappe.web_form.get_value('technicalengineering')) && !(frappe.web_form.get_value('other_specialisation'))) {
        frappe.msgprint('Select atleast one specialization');
        return false;
    }
    return true;
}

