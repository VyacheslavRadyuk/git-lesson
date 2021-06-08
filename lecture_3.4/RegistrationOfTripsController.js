({
    doInit : function(component, event, helper) {
        component.set("v.columns", [
            {label: 'Tourist Name', fieldName: 'linkName', type: 'url', 
             typeAttributes: {label: {fieldName: 'Name'}, target: '_blank'}},
            {label: 'Email', fieldName: 'Email__c', type: 'email'},
            {label: 'Gender', fieldName: 'Gender__c', type: 'picklist'}
        ]);
        helper.fetchTourist(component, event);
        helper.fetchSeats(component, event);
        helper.fetchFlights(component, event);
        helper.fetchStartDate(component, event);       
        
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.today', today);
    },
    
    handleClick : function (component, event, helper) {               
        const msg = $A.get("$Label.c.confirmationWindow");
        var countSeats = component.get('v.countSeats');
        var countFlights = component.get('v.countFlights');
        var todayDate = component.get('v.today');
        var startDate = component.get('v.startDate');
        var selectedTourists = component.get('v.selectedTourists').length;
        
        if (countSeats == countFlights || startDate < todayDate) {
            component.set('v.isActiveButton', true);
        }
        
        if (countFlights + selectedTourists > countSeats) {
            var toastError = $A.get("e.force:showToast");
            toastError.setParams({
                message: $A.get("$Label.c.createFlightsError"),
                duration: 3000,
                type: $A.get("$Label.c.toastTypeError")
            });
            toastError.fire();
        } else if (!confirm(msg)) {
            return false;
        } else {
            helper.createFlights(component, event);          
        }   
    },
    
    doSelectRecord : function(component, event, helper) {
        helper.selectRecords(component, event);
    },
    
    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true); 
    },
    
    hideSpinner : function(component,event,helper){  
        component.set("v.spinner", false);
    }
})