import React,{useState} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="flex flex-col gap-5  p-5">
            <Label>OB Technical Test</Label>
            <Button>
                <Link to="/" className="text-white">Create Interests</Link>
            </Button>
            <Button>
                <Link to="/interests" className="text-white"> Get Interests</Link>
            </Button>
        </div>
    );
}
export default Sidebar;