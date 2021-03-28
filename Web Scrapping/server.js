const express = require("express");
const app = express();
const fs = require("fs");
const cheerio = require('cheerio')
const request = require('request')


request('https://www.blog.duomly.com/node-js-project-ideas-for-beginners/',(err,response,html)=>{
  if(!err) {
    
    const $ = cheerio.load(html)

    const heading = $('.content h1')
    console.log(heading.text())
  

    // New csv file
    const writeStream = fs.createWriteStream('nav.csv')

  // Heaader
    writeStream.write(`Title\n`)

    const nav = $('.header__menu__list li a')

    // Adding each nav data to csv file
    nav.each((index,el)=>{
      const anchor = $(el).text().replace(/\s\s+/g,'')
      writeStream.write(`${anchor}\n`)
    })

  
  } 
})