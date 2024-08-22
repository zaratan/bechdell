import { JSDOM } from 'jsdom';
import fs from 'fs';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { sortBy, take } from 'lodash';
import List from '@/components/List';

export default function Home() {
  const dataFile = fs.readFileSync('./data/index.html', 'utf8');
  const testJSDOM = new JSDOM(dataFile);
  /*  
   *  <a 
   *    id=\"movie-9806\" 
   *    href=\"/view/9806/le_singe_musicien/\"
   *    >
   *    Le singe musicien
   *  </a>
   *  <a href=\"/view/9806/le_singe_musicien/\" 
   *    onclick=\"showComments('9806'); return false;\"
   *    >
   *    <img 
   *      src=\"/static/comments.png\" 
   *      alt=\"[1 comment(s) available]\"
				  id=\"comment-img-9806\" 
          style=\"height: 10px; width: 10px;\"
          title=\"1 comment\">
      </a>  
      </div>   <div class=\"movie\"><a href=\"https://www.imdb.com/title/tt2221420/\"><img src=\"/static/nopass.png\" alt=\"[[0]]\" title=\"[Fewer than two women in this movie]\"></a>
 */
  const allMovies = testJSDOM.window.document.querySelectorAll('div.movie');

  const data = Array.from(allMovies).map((movie) => {
    const movieInfos = movie.querySelectorAll('a');
    const imdbLink = movieInfos[0].getAttribute('href');
    const movieTitle = movieInfos[1].textContent;
    const result =
      movieInfos[0].querySelector('img')?.getAttribute('src') !==
      '/static/nopass.png';
    const comment =
      movieInfos[0]
        .querySelector('img')
        ?.getAttribute('title')
        ?.replace(/[\[\]]/g, '') || '';
    return { movieTitle, result, comment, imdbLink };
  });

  const sortedData = sortBy(data, ['movieTitle']);

  return <List data={sortedData} />;
}
