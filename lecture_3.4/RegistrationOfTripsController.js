({
    doInit : function(component, event, helper) {
        component.set("v.columns", [
            {label: 'Tourist Name', fieldName: 'linkName', type: 'url', 
             typeAttributes: {label: {fieldName: 'Name'}, target: '_blank'}},
            {label: 'Email', fieldName: 'Email__c', type: 'email', initialWidth: 300},
            {label: 'Gender', fieldName: 'Gender__c', type: 'picklist', initialWidth: 95}
        ]);
        helper.fetchTourist(component, event);
        helper.fetchSeats(component, event);
        helper.fetchFlights(component, event);
        helper.fetchStartDate(component, event);       
        
        const today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.today', today);
    },
    
    handleClick : function (component, event, helper) {               
        const msg = $A.get("$Label.c.confirmationWindow");
        const countSeats = component.get('v.countSeats');
        const countFlights = component.get('v.countFlights');
        const todayDate = component.get('v.today');
        const startDate = component.get('v.startDate');
        const selectedTourists = component.get('v.selectedTourists').length;

        if (countSeats == countFlights || startDate < todayDate) {
            component.set('v.isActiveButton', true);
        } else if (countFlights + selectedTourists > countSeats) {
            const toastError = $A.get("e.force:showToast");
            toastError.setParams({
                message: $A.get("$Label.c.createFlightsError"),
                duration: 3000,
                type: $A.get("$Label.c.toastTypeError")
            });
            toastError.fire();
        } else {
            component.set('v.showConfirmWindow', true);
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
    },
    
    confirmDialogNo : function(component,event,helper) {
        component.set('v.showConfirmWindow', false);
        return false;
    },
    
    confirmDialogYes : function(component,event,helper) {
        component.set('v.showConfirmWindow', false);
        helper.createFlights(component, event);
    }
})