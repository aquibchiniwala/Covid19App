import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { INews } from 'src/Models/INews';

@Injectable({
  providedIn: 'root'
})

export class NewsInMemoryDbService implements InMemoryDbService {
  createDb() {

    /** Default User data collection. */
    const news: INews[] = [{
      id: 1,
      title: '1st News',
      description: 'lorem Epsum',
      summary: 'lorem Epsum',
      fullNews: 'lorem Epsum'
    }, {
      id: 2,
      title: '2nd News',
      description: 'lorem Epsum',
      summary: 'lorem Epsum',
      fullNews: 'lorem Epsum'
    }];

    return {news};
  }

/** Method that generates the ids of user when not passed. */
  genId(news: INews[]): number {
    return news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
  }
}
