import React, { useState, useEffect, useRef } from "react";

export default useTimer = (arg) => {
  const [remSec, setRemSec] = useState(arg * 60);
  const [min, setMin] = useState(arg);
  const [sec, setSec] = useState(0);
  const [expired, setExpired] = useState(false);
  const [isRunning, setIsRunning] = useState(false)
  const interval = useRef(null);

  const SECOND = 60;

  const start = () => {
    if(!isRunning){
      setExpired(false);
      setIsRunning(true)
      setRemSec(min*SECOND)
      interval.current = setInterval(() => {
        setRemSec((_prev) => _prev - 1);
      }, 1000);
    }
  };
  const stop = () => {
    setExpired(true);
    setIsRunning(false)
    clearInterval(interval.current);
    interval.current = null
  };

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if(remSec<=0) stop()
    setSec(() => remSec%SECOND)
    setMin(() => Math.floor(remSec/SECOND))
  }, [remSec])
  

  return { min, sec, expired,isRunning, start, setMin };
};
