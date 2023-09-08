import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Problem } from '../interfaces/problem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RootService {
  api = 'https://codeforces.com/api/';
  problemsetArchives: any;
  fetched: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null) ;
  constructor(private http: HttpClient) {
    setInterval(() => {
      // this.fetchInRegularInterval();
    }, 3600000);
  }

  getAllProblems() {
    const endpoint = 'problemset.problems';
    const url = this.api + endpoint;
    return this.http.get(url);
  }

  fetchInRegularInterval() {
    this.getAllProblems().subscribe((response: any) => {
      if (response.status === 'OK') {
        this.problemsetArchives = response.result;
      }
      this.fetched.next(true) ;
    });
  }

  getProblems() {
    return this.problemsetArchives;
  }

  getSubmissions(author: string, contestId: number, count: number = 100) {
    const url = this.api + `contest.status?contestId=${contestId}&handle=${author}&from=1&count=${count}`;
    return this.http.get(url) ;
  }
}
