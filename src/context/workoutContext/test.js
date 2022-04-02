

const calcDaysAgo = (date) => {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

   const today = new Date()
   const todaysDate = today.getDate()
   const thisMonth = today.getMonth()
   const thisYear = today.getFullYear()
   
  
  const dayOfTheYear = daysInMonths.slice(0, thisMonth).reduce((acc, cur) => cur + acc, 0) + todaysDate
  
  
  const incomingDateYear = +date.slice(0, 4)
  const incomingDateMonth = +date.slice(4, 6)
  const incomingDateDate = +date.slice(6, 8)
  
  const incomingDateDayOfTheYear = daysInMonths.slice(0, incomingDateMonth - 1).reduce((acc, cur) => cur + acc, 0) + incomingDateDate
  
  
  
  let daysAgo = dayOfTheYear - incomingDateDayOfTheYear
  
  //if date compared to was last year
  if(thisYear - incomingDateYear >= 1) {
    const diffInYears = thisYear - incomingDateYear
    daysAgo = (365 * (diffInYears - 1)) + (365 - incomingDateDayOfTheYear) + dayOfTheYear
  } 
  
  let timeAgo;
  
  if(daysAgo >= 365) {
    let yearsAgo = Math.floor(daysAgo / 365)
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`
    
  } else if(daysAgo >= 30){
    let monthsAgo = Math.floor(daysAgo / 30)
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
    
  } else if(daysAgo === 1) {
    return 'Yesterday'
    
  } else if (daysAgo < 30 && daysAgo >=7) {
   let weeks = Math.floor(daysAgo / 7)
   
   if(weeks === 1) {
     return 'Last week'
   } else {
     return `${weeks} weeks ago`
   }
  }
}

console.log(calcDaysAgo('20220317 Tue'))