'use client';

import Image from "next/image";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import CountdownTimer from "./components/timer";
import Counter from "./components/counter";
import './globals.css';
import Shop from "./components/shop";
import Footer from "./components/footer";
import Address from "./components/address";


export default function Home() {
  return (
    <main className="flex flex-col items-center align-center ">
      <h1 className="container mx-auto title">Buy Tickets</h1>
      <p className="container mx-auto sub_title">Autumn Cup AGG USA</p>
      <CountdownTimer />
      <div className="wrapper"></div>
      <Shop/>
      <div className="line"></div>
      <Address/>
      <div className="line"></div>
      <Footer />
    </main>
  );
}