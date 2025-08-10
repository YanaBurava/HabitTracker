import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core';

@Component({
  selector: 'mat-tab-nav-panel',
  template: '<ng-content></ng-content>',
  standalone: false
})
class MockMatTabNavPanel { @Input() tabPanel: any; }

@NgModule({
  declarations: [MockMatTabNavPanel],
  exports: [MockMatTabNavPanel]
})
class MockMatTabNavPanelModule {}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        HttpClientModule,
        MatTabsModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        MockMatTabNavPanel
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'habit-tracker-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('habit-tracker-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, habit-tracker-app');
  });
});