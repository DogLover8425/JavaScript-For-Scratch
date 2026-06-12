# JavaScript For Scratch

This extension allows you to use various JavaScript features in Scratch!

## Installation

To use ScratchJS, create a bookmarklet with the following code.  
(For non-technical users: Make a bookmark and set the URL to this code.)

```javascript
javascript:(async()=>{try{const r=await fetch("https://raw.githubusercontent.com/Ironbill25/JavaScript-For-Scratch/refs/heads/main/scratchjs.js",{cache:"no-cache" });if (!r.ok)throw new Error("Fetch fail "+r.status);    let c=await r.text();let s=document.createElement("script");s.textContent=c;document.body.appendChild(s);console.log("Loaded");}catch(e){console.error("Fail",e)}})();
```

Go to the Scratch editor and click the bookmarklet to load the extension.

## Safety Notice

When ScratchJS loads, you will see a warning modal indicating that this extension has access to advanced features. Only use projects with ScratchJS from creators you trust, as projects can potentially perform dangerous operations.
