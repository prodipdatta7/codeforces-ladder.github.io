import { Component, OnInit } from '@angular/core';
import { Problem } from '../../interfaces/problem';
import { RootService } from '../../services/root.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.scss']
})
export class RootContainerComponent implements OnInit {
  problemSet: Problem[] = [] ;
  problemArchives : any ;
  loading = false ;
  pageNumber = 1;
  pageSize = 15 ;
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

  getProblemSet() {
    this.rootService.getAllProblems().pipe(filter(s => s !== null), take(1)).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.problemArchives = response.result ;
        this.problemArchives.problems = this.problemArchives.problems.filter((p: any) => p.index === 'C') ;
        this.problemArchives.problemStatistics = this.problemArchives.problemStatistics.filter((p: any) => p.index === 'C') ;
        this.formatProblemSet() ;
      }
      this.loading = false ;
    }) ;
  }

  getNextPage(delta: number) {
    this.loading = true ;
    this.pageNumber += delta ;
    this.formatProblemSet() ;
  }

  formatProblemSet() {
    this.loading = false ;
    this.problemSet = this.rootService.prepareData(this.problemArchives, this.pageNumber, this.pageSize) ;
    this.updateStatus() ;
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

  openLink(link: string) {
    window.open(link, '_blank') ;
  }

}
