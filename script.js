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

frappe.web_form.validate = () => {
    
    if (!(frappe.web_form.get_value('option1')) && !(frappe.web_form.get_value('option2')) && !(frappe.web_form.get_value('option3')) && !(frappe.web_form.get_value('holiday_')) ) {
        error.push("Select time availability slot.");
    }
    if (!(frappe.web_form.get_value('aiic')) && !(frappe.web_form.get_value('vkd')) && !(frappe.web_form.get_value('atc')) && !(frappe.web_form.get_value('iti')) && !(frappe.web_form.get_value('other_memberships'))) {
        error.push("Select at least one Membership.");
    }
    if (!(frappe.web_form.get_value('trainingeducation')) && !(frappe.web_form.get_value('businessfinancial')) && !(frappe.web_form.get_value('general')) && !(frappe.web_form.get_value('it')) && !(frappe.web_form.get_value('tourismtravel')) && !(frappe.web_form.get_value('marketing')) && !(frappe.web_form.get_value('technicalengineering')) && !(frappe.web_form.get_value('other_specialisation'))) {
        error.push("Select at least one Specialization.");
    }
    if (!(frappe.web_form.get_value('frenchenglish')) && !(frappe.web_form.get_value('italianenglish')) && !(frappe.web_form.get_value('bengalienglish')) && !(frappe.web_form.get_value('urduenglish')) && !(frappe.web_form.get_value('marathienglish')) && !(frappe.web_form.get_value('tamilenglish')) && !(frappe.web_form.get_value('gujaratienglish')) && !(frappe.web_form.get_value('japaneseenglish')) && !(frappe.web_form.get_value('russianenglish')) && !(frappe.web_form.get_value('mandarinenglish')) && !(frappe.web_form.get_value('koreanenglish')) && !(frappe.web_form.get_value('indonesianenglish')) && !(frappe.web_form.get_value('vietnameseenglish')) && !(frappe.web_form.get_value('japaneseenglish')) && !(frappe.web_form.get_value('thaienglish')) && !(frappe.web_form.get_value('burmeseenglish')) && !(frappe.web_form.get_value('javaneseenglish')) && !(frappe.web_form.get_value('arabicenglish')) && !(frappe.web_form.get_value('portugueseenglish')) && !(frappe.web_form.get_value('germanenglish')) && !(frappe.web_form.get_value('spanishenglish')) && !(frappe.web_form.get_value('turkishenglish')) && !(frappe.web_form.get_value('hindienglish')) && !(frappe.web_form.get_value('other_lang'))) {
        error.push("Select at least one Language Pair.");
    }
    if (!(frappe.web_form.get_value('yes_')) && !(frappe.web_form.get_value('no_'))) {
        error.push("Select option for Wired Internet.");
    }
    if (error.length>0){
        frappe.msgprint(error);
        return false;
    }
    return true;
}
