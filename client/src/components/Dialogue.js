import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Form from "./Form";
 
export default function DialogDefault() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handleClose = () =>{
    setOpen(false)
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Request Callback
      </Button>
      <Dialog open={open}  handler={handleOpen} size="full" className="flex"  style={{height:'100vh', background:'#ffffff85'}}>
        <DialogBody className="m-auto" >
         <Form close={handleClose}/>
        </DialogBody>
    
      </Dialog>
    </>
  );
}