import React from 'react';
import { useFormContext } from 'react-hook-form';
import AvailabilityDateField from './AvailabilityDateField';
import AvailabilityField from './AvailabilityField';

const AvailabilityCard: React.FC = () => {
   const [availability, setAvailability] = React.useState<string>("");
   const [isVisible, setIsVisible] = React.useState<boolean>(false);
   const forms = useFormContext();
   const field = forms.watch("availability");

   React.useEffect(()=>{
      setAvailability(forms.getValues("availability"));

   }, [field, forms]);

   React.useEffect(()=>{
      if (availability == "Manual") {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   }, [availability])

  return (
   <div className="flex flex-col lg:flex-row justify-between gap-4">
      <div className="select-availability gap-3 mx-3 w-1/2">                 
         <AvailabilityField messageDisabled={false} />
      </div>
      <div className="availability-date gap-3 mr-12 pr-1">
         {/* unlock datepicker if availability set to manual */}
         <AvailabilityDateField disabled={!isVisible} messageDisabled={false} />
         
      </div>
   </div>
  )
}

export default AvailabilityCard