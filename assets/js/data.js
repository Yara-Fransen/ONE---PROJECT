//one event
const oneEventDiv = document.getElementById('one-event');
oneEventDiv.addEventListener('mouseenter', () => {
  oneEventDiv.innerText = ''; 
});
oneEventDiv.addEventListener('mouseleave', () => {
  oneEventDiv.innerText = 'ONE EVENT'; 
});

//one week
const oneWeekDiv = document.getElementById('one-week');
oneWeekDiv.addEventListener('mouseenter', () => {
  oneWeekDiv.innerText = '';  
});
oneWeekDiv.addEventListener('mouseleave', () => {
  oneWeekDiv.innerText = 'ONE WEEK'; 
});

//one news channel
const oneChannelDiv = document.getElementById('one-newschannel');
oneChannelDiv.addEventListener('mouseenter', () => {
  oneChannelDiv.innerText = ''; 
});
oneChannelDiv.addEventListener('mouseleave', () => {
  oneChannelDiv.innerText = 'ONE NEWS CHANNEL';  
}); 



const headlines = document.getElementById('headlines');

let headlinesByCategory;
let headlinesByDate;


const compareByCategory = (a, b) => {
  if (a.CATEGORY > b.CATEGORY) return -1;
  if (a.CATEGORY < b.CATEGORY) return 1;
  return 0;
}

 const displayHeadlines = (ordering) => {
  let orderedHeadlines = [];

  switch (ordering) {
    case 'category':
      orderedHeadlines = headlinesByCategory;
      break;

    case 'date':
      orderedHeadlines = headlinesByDate;
      break;
  }
  
  var buttons = document.querySelectorAll( '#buttons button' );
  buttons.forEach( function( btn ) {
    if ( ordering == btn.innerText.toLowerCase( ) ) {
      btn.classList.add( 'active' );
    } else {
      btn.classList.remove( 'active' );
    }
  } )

  headlines.innerHTML = ''; 

  orderedHeadlines.forEach(headline => {
    const headlineOutput = document.createElement('p');
    headlineOutput.addEventListener( 'click', function( ) {

      var bigHeadline = document.createElement( 'h2' );
      bigHeadline.classList.add( 'big-headline' );
      bigHeadline.innerHTML = headline.HEADLINE.replace(/'([^']+)'/g, "<span class='highlight'>'$1'</span>");
      
      bigHeadline.style.left = `${ Math.random( ) * 20 }vw`;
      bigHeadline.style.right = `${ Math.random( ) * 30 }vw`;
      bigHeadline.style.bottom = `${ Math.random( ) * 65 }%`;

      headlines.appendChild( bigHeadline );
    } );

    // NEWS CHANNEL
    const headlineChannel = document.createElement('div');
    headlineChannel.classList.add('channel');
    headlineChannel.innerText = headline.CHANNEL;
    headlineOutput.appendChild(headlineChannel);


    // EVENT
    const headlineEvent = document.createElement('div');
    headlineEvent.classList.add('event');
    headlineEvent.innerText = headline.EVENT;
    headlineOutput.appendChild(headlineEvent);


    // CATEGORY
    const headlineCategory = document.createElement('div');
    headlineCategory.classList.add('category');
    headlineCategory.innerText = headline.CATEGORY;
    headlineOutput.appendChild(headlineCategory);
    

    // DATE
    const headlineDate = document.createElement('div');
    headlineDate.classList.add('date');
    headlineDate.innerText = headline.DATE;
    headlineOutput.appendChild(headlineDate);

    // TIME
    const headlineTime = document.createElement('div');
    headlineTime.classList.add('time');
    headlineTime.innerText = headline.TIME;
    headlineOutput.appendChild(headlineTime);

    // HRSMIN
    const headlineHrsmin = document.createElement('div');
    headlineHrsmin.classList.add('hrsmin');
    headlineHrsmin.innerText = headline.HRSMIN;
    headlineOutput.appendChild(headlineHrsmin);

    // TIME2
    const headlineTime2 = document.createElement('div');
    headlineTime2.classList.add('time2');
    headlineTime2.innerText = headline.TIME2;
    headlineOutput.appendChild(headlineTime2);

    headlines.appendChild(headlineOutput);
  });
}

const orderBtns = document.querySelectorAll( '#buttons button' );
orderBtns.forEach( orderBtn => {
  orderBtn.addEventListener( 'click', ( ) => {
    displayHeadlines( orderBtn.innerText.toLowerCase( ) );
  } );

})


const infoDiv = document.getElementById('info');
const readMoreBtn = document.getElementById('read-more');
const readLessBtn = document.getElementById('read-less');

readMoreBtn.addEventListener( 'click', ( ) => {
  infoDiv.style.display = 'grid';
  readMoreBtn.style.display = 'none';
  readLessBtn.style.display = 'inline-block';
} );

readLessBtn.addEventListener( 'click', ( ) => {
  infoDiv.style.display = 'none';
  readMoreBtn.style.display = 'inline-block';
  readLessBtn.style.display = 'none';
} );

fetch('data/headlines.json')
  .then(response => response.json())
  .then(data => {
    headlinesByDate = data.map(x => x);
    headlinesByCategory = data.slice().sort(compareByCategory);
    displayHeadlines('date');
  }); 
