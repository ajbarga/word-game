// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container)
root.render(<App />);