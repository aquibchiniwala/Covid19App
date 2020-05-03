import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesGraphComponent } from './cases-graph.component';

describe('PopulationGraphComponent', () => {
  let component: CasesGraphComponent;
  let fixture: ComponentFixture<CasesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
