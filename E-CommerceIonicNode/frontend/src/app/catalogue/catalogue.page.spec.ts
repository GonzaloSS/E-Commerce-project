import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CataloguePage } from './catalogue.page';

describe('CataloguePage', () => {
  let component: CataloguePage;
  let fixture: ComponentFixture<CataloguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CataloguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CataloguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
