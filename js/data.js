/* ==========================================================================
   TECHNICAL WINDOWS — VIDEO DATA
   --------------------------------------------------------------------------
   This is the single source of truth for every video on the site.
   The FIRST item in the array is shown first ("latest upload").

   This file is updated automatically by the Admin Page. Editing it by
   hand is fine too, as long as the format stays valid.
   ========================================================================== */

const CATEGORY_LABELS = {
  installation: "Installation",
  python: "Python",
  bigdata: "Big Data",
  coding: "Coding"
};

const VIDEOS = [
  {
    id: "ganesh-ugal",
    title: "Testing Title",
    category: "installation",
    thumbnail: "images/thumbnails/ganesh-ugal.jpg",
    setupLinks: [
      { label: "Test Setup", url: "https://ganesh-ugale.github.io/technicalwindows/" }
    ]
  },
  {
    id: "Dp2-dAftD1Q",
    title: "How to Install Hadoop on Windows: Step-by-Step Guide | SPPU DSBDA LAB | Big Data",
    category: "bigdata",
    setupLinks: [
      { label: "Download Hadoop Setup Files", url: "https://shorturl.at/iMEDM" },
      { label: "Download Eclipse IDE", url: "https://www.eclipse.org/downloads/" }
    ]
  },
  {
    id: "htbYT7_TZKA",
    title: "Hadoop MapReduce WordCount Practical Tutorial | DSBDA Lab Group-B(1) | SPPU",
    category: "bigdata",
    setupLinks: [
      { label: "MapReduce WordCount Code File", url: "https://shorturl.at/lbnx3" }
    ]
  },
  {
    id: "qteKy97u4To",
    title: "Design a Distributed Application Using MapReduce to Process a Log File | DSBDA Lab",
    category: "bigdata",
    setupLinks: [
      { label: "Code & Log File Download", url: "https://bit.ly/4kw4A6I" }
    ]
  },
  {
    id: "95plnFwgG6g",
    title: "Install VS Code on Windows 10 & 11 | Run C/C++ Program | Easy 2024 Update",
    category: "installation",
    setupLinks: [
      { label: "VS Code Download", url: "https://code.visualstudio.com/download" },
      { label: "MinGW Compiler Download", url: "https://rb.gy/9kkhlj" }
    ]
  },
  {
    id: "3Yh1iJ1Z4Qs",
    title: "How to Install Scala & Apache Spark Framework on Windows 10/11 & Run Program | DSBDA Lab | SPPU",
    category: "bigdata",
    setupLinks: [
      { label: "Installation Steps Guide", url: "http://surl.li/tekrh" },
      { label: "Java JDK Download", url: "http://surl.li/tekyc" },
      { label: "Scala Download", url: "http://surl.li/tekzk" },
      { label: "WinRAR Download", url: "http://surl.li/dcgtq" },
      { label: "Apache Spark Download", url: "http://surl.li/telbm" }
    ]
  },
  {
    id: "EGG8la6bCiI",
    title: "How to Install Java On Windows 10/11 [2024 Updated] | Run First Java Program in VS Code",
    category: "installation",
    setupLinks: []
  },
  {
    id: "DY17fUnnE7M",
    title: "How to Install Anaconda on Windows 11/10: Step-by-Step Guide (2024 Updated) | DS&BDA | SPPU",
    category: "python",
    setupLinks: []
  },
  {
    id: "l6KnQO65oSg",
    title: "How to Download and Install Jupyter Notebook on Windows 10/11 | Easy Step-by-Step Guide",
    category: "python",
    setupLinks: []
  },
  {
    id: "fZhoBff7w3Y",
    title: "How to Download and Install Python on Windows Hindi [2024 Easy Method]",
    category: "python",
    setupLinks: [
      { label: "Python Official Website", url: "https://www.python.org/" },
      { label: "VS Code Download", url: "https://code.visualstudio.com/download" }
    ]
  },
  {
    id: "e13DxJVmrS8",
    title: "How to Install MySQL in Windows 2024 | DBMS | Step-by-Step (Quick & Easy)",
    category: "installation",
    setupLinks: []
  },
  {
    id: "FwHKeRThbbM",
    title: "Web Development Setup for Beginners | Easy System Requirements & Essential Guide",
    category: "coding",
    setupLinks: []
  },
  {
    id: "-Kej3u-JiFw",
    title: "How to Setup & Install graphics.h Library in Windows VS Code | Run CG Programs (Easy)",
    category: "coding",
    setupLinks: [
      { label: "CG All Softwares Download", url: "http://surl.li/osros" },
      { label: "CG All Programs Download", url: "http://surl.li/osrot" }
    ]
  },
  {
    id: "b48GLt9-G1k",
    title: "How to Create Bootable Pendrive Without any Software | Bootable Pendrive Kaise Banaye (Easy Method)",
    category: "installation",
    setupLinks: [
      { label: "BootKeys Download", url: "http://surl.li/opfye" },
      { label: "Windows 10 ISO Download", url: "http://surl.li/opfyg" }
    ]
  },
  {
    id: "i3H7-OCKUF8",
    title: "How to Install Windows Without USB Pen Drive or CD in Hindi | Install Windows Without Losing Data",
    category: "installation",
    setupLinks: []
  },
  {
    id: "YuNeGj5K_08",
    title: "How To Install Android Apps in Laptop Without Using Emulator | Laptop me Android App Chalay",
    category: "installation",
    setupLinks: []
  }
];
