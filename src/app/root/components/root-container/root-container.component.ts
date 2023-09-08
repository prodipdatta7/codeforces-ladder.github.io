import { Component, OnInit } from '@angular/core';
import { Problem } from '../../interfaces/problem';
import { RootService } from '../../services/root.service';
import { filter, take } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.scss'],
  animations:[
    trigger('openClose', [
      state('open', style({
        width: '320px',
        height: 'calc(100vh - 88px)',
        opacity: 1
      })),
      state('close', style({
        width: '0px',
        opacity: 0,
        display: 'none',
        visibility: 'hidden'
      })),
      transition('open => close', [
        animate(700)
      ]),
      transition('close => open', [
        animate(700)
      ]),
    ])
  ]
})
export class RootContainerComponent implements OnInit {
  problemSet: Problem[] = [] ;
  statistics: any[] = [] ;
  allProblems : any[] = [] ;
  allStatistics = [] ;
  problemArchives : any ;
  loading = false ;
  pageNumber = 1;
  pageSize = 15 ;
  viewFilter = false ;
  constructor(
    private rootService: RootService
  ) {
  }

  ngOnInit(): void {
    this.pageNumber = 1 ;
    this.pageSize = 15 ;
    this.loading = true ;
    this.getProblemSet() ;
  }

  toggleView() {
    this.viewFilter = !this.viewFilter ;
  }

  addSolveCount(statistics: any[]) {
    for (let i = 0 ; i < this.allProblems.length ; ++i) {
      this.allProblems[i]['solveCount'] = statistics[i].solvedCount ;
    }
  }

  getProblemSet() {
    this.rootService.getAllProblems().pipe(filter(s => s !== null), take(1)).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.problemArchives = response.result ;
        this.allProblems = response.result.problems ;
        this.addSolveCount(response.result.problemStatistics) ;
        this.getNextPage() ;
      }
    }) ;
  }

  getPageSizeChangeEvent(pageSize: number) {
    this.pageSize = pageSize ;
    this.getNextPage() ;
  }

  getPageNumberChangeEvent(pageNumber: number) {
    this.pageNumber = pageNumber ;
    this.getNextPage() ;
  }

  getNextPage(delta = 0) {
    this.loading = true ;
    this.pageNumber += delta ;
    this.formatProblemSet() ;
  }

  isContained(problem: Problem, tagList: string[], disjoint = true) {
    if (disjoint) {
      let valid = false ;
      tagList.forEach(tag => {
        if (problem.tags.includes(tag)) {
          valid = true ;
        }
      }) ;
      return valid ;
    } else {
      let valid = true ;
      tagList.forEach(tag => {
        if (!problem.tags.includes(tag)) {
          valid = false ;
        }
      }) ;
      return valid ;
    }
  }

  filterBy(event: any) {
    this.loading = true ;
    let filterList = this.allProblems ;
    if (event?.contestId) {
      filterList = filterList.filter(p => p.contestId === event.contestId) ;
    }
    if (event?.index) {
      filterList = filterList.filter(p => p.index === event.index) ;
    }
    if (event?.maxpoints) {
      filterList = filterList.filter(p => p.maxpoints <= event.maxpoints && p.minpoints >= event.minpoints) ;
    }
    if (event?.tags) {
      const TagList = event.tags.split(',') ;
      filterList = filterList.filter(p => this.isContained(p, TagList)) ;
    }
    if (event?.sortOrder) {
      if (event.sortOrder === 'asc') filterList = filterList.sort((a, b) => a.orderBy < b.orderBy ? -1 : 1) ;
      else filterList = filterList.sort((a, b) => a.orderBy > b.orderBy ? -1 : 1) ;
    }
    this.problemSet = filterList ;
    this.loading = false ;
  }

  formatProblemSet() {
    const from = (this.pageNumber - 1) * this.pageSize ;
    this.problemSet = this.problemArchives.problems.slice(from, from + this.pageSize) ;
    this.statistics = this.problemArchives.problemStatistics.slice(from, from + this.pageSize) ;
    this.loading = false ;
  }
  updateStatus() {
    this.problemSet.forEach((problem: any) => {
      setTimeout(() =>{
        this.rootService.getSubmissions('prodipdatta7', problem.id).subscribe((data: any) => {
          debugger
        })
      }, 2000);
    })
  }

  openLink(problem: Problem) {
    const url = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
    window.open(url, '_blank') ;
  }

}
