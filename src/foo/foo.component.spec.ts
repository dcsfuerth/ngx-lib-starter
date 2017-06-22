import * as fs from 'fs';
import { expect } from 'chai';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import {
  ComponentFixture,
  TestBed,
  getTestBed,
  ComponentFixtureAutoDetect
} from '@angular/core/testing';

import { FooComponent } from './foo.component';

function setupComponentForTesting(componentKlass: any, templateName: string) {
  TestBed.overrideComponent(componentKlass, {
    set: {
      styleUrls: [],
      templateUrl: undefined,
      template: fs.readFileSync(__dirname + '/' + templateName).toString()
    }
  });
}

describe('FooComponent', () => {
  describe('testing the component as pure class', () => {
    let subject: FooComponent;

    beforeEach(() => {
      subject = new FooComponent();
    });

    describe('ngOnInit', () => {
      beforeEach(() => {
        subject.ngOnInit();
      });

      it('sets content property', () => {
        expect(subject.content).to.be.not.empty;
      });
    });
  });

  describe('testing the component in angular context', () => {
    let subject: FooComponent;
    let fixture: ComponentFixture<FooComponent>;
    let domElement: HTMLElement;

    beforeEach(() => {
      setupComponentForTesting(FooComponent, './foo.component.html');

      TestBed.configureTestingModule({
        declarations: [FooComponent],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        schemas: [NO_ERRORS_SCHEMA]
      });

      TestBed.compileComponents();

      fixture = TestBed.createComponent(FooComponent);
      subject = fixture.componentInstance;
      domElement = fixture.nativeElement;
    });

    afterEach(() => {
      getTestBed().resetTestingModule();
    });

    it('sets the content property', () => {
      expect(subject.content).to.not.be.empty;
    });

    it('renders the template with content', () => {
      expect(domElement.innerHTML).to.equal(
        `<div>${subject.content} ${subject.sense}</div>\n`
      );
    });
  });
});
