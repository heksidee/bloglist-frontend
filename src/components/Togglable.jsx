import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef(({ children, buttonLabel}, ref) => {
    const [visible, setVisible] = useState(false)
})