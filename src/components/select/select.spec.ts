import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MdlSelectModule, MdlSelectComponent } from './select';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MdlSelect', () => {

    describe('single', () => {

        let fixture: ComponentFixture<TestSingleComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MdlSelectModule.forRoot()],
                declarations: [TestSingleComponent],
            });

            TestBed.compileComponents().then( () => {
                fixture = TestBed.createComponent(TestSingleComponent);
                fixture.detectChanges();
            });
        }));


        it('should create the component and add the mdl-select css class', async(() => {

            let selectComponent = fixture.debugElement.query(By.directive(MdlSelectComponent));

            let selectNativeElement = selectComponent.nativeElement;

            expect(selectNativeElement.classList.contains('mdl-select'))
                .toBe(true, 'did not has css class mdl-select')

        }));

        it('should support ngModel', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponent = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            fixture.whenStable().then(() => {
                expect(selectComponent.ngModel)
                  .toEqual(1, 'did not init ngModel');

                testInstance.personId = 2;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponent.ngModel)
                      .toEqual(2, 'did not update ngModel')
                });
            });

        }));

        it('should reset ngModel', async(() => {

            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            fixture.whenStable().then(() => {
                expect(selectComponentInstance.ngModel)
                  .toEqual(1, 'did not init ngModel');

                selectComponentInstance.reset();

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponentInstance.ngModel)
                      .toEqual('', 'did not reset ngModel')
                });
            });

        }));

        it('should bind options on options change', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            spyOn(selectComponentInstance, 'bindOptions').and.callThrough();

            testInstance.people.push({id: 4, name: 'Gary Cole'});

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(selectComponentInstance.bindOptions)
                  .toHaveBeenCalled();

                expect(selectComponentInstance.textByValue[4])
                  .toEqual('Gary Cole');

            });
        }));

        it('focus should have keyboard events', async(() => {

            let testInstance = fixture.componentInstance;

            let selectComponent = fixture.debugElement.query(By.directive(MdlSelectComponent));

            let selectNativeElement = selectComponent.nativeElement;

            let selectComponentInstance = selectComponent.componentInstance;

            spyOn(selectComponentInstance, 'onKeydown').and.callThrough();

            spyOn(selectComponentInstance, 'onArrowUp').and.callThrough();

            spyOn(selectComponentInstance, 'onArrowDown').and.callThrough();

            spyOn(selectComponentInstance, 'addFocus').and.callThrough();

            spyOn(selectComponentInstance, 'removeFocus').and.callThrough();
            
            //console.log(selectNativeElement.querySelector("span[tabindex]"));
            //document.body.appendChild(selectNativeElement);

            selectNativeElement.querySelector("span[tabindex]").focus();
            fixture.detectChanges();

            expect(selectComponentInstance.popoverComponent.isVisible)
                .toEqual(true, 'toggle did not update isVisible to true');

            document.dispatchEvent(new KeyboardEvent('keydown', { key: "ArrowDown" })); // 40, 38, 9
            fixture.detectChanges();
            
            document.dispatchEvent(new KeyboardEvent('keydown', { key: "ArrowUp" })); // 40, 38, 9
            fixture.detectChanges();

            document.dispatchEvent(new KeyboardEvent('keydown', { key: "Tab" })); // 40, 38, 9
            fixture.detectChanges();

            selectNativeElement.querySelector("span[tabindex]").blur();
            fixture.detectChanges();

            expect(selectComponentInstance.popoverComponent.isVisible)
                .toEqual(false, 'toggle did not update isVisible to false');

            expect(selectComponentInstance.onKeydown).toHaveBeenCalled();

            expect(selectComponentInstance.onArrowUp).toHaveBeenCalled();

            expect(selectComponentInstance.onArrowDown).toHaveBeenCalled();

            expect(selectComponentInstance.addFocus).toHaveBeenCalled();

            expect(selectComponentInstance.removeFocus).toHaveBeenCalled();
        }));

    });

    describe('multiple', () => {

        let fixture: ComponentFixture<TestMultipleComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MdlSelectModule.forRoot()],
                declarations: [TestMultipleComponent],
            });

            TestBed.compileComponents().then( () => {
                fixture = TestBed.createComponent(TestMultipleComponent);
                fixture.detectChanges();
            });
        }));

        it('should create the component and add the mdl-select css class', async(() => {

            let selectComponent = fixture.debugElement.query(By.directive(MdlSelectComponent));

            let selectNativeElement = selectComponent.nativeElement;

            expect(selectNativeElement.classList.contains('mdl-select'))
              .toBe(true, 'did not has css class mdl-select')

        }));

        it('should support ngModel', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            fixture.whenStable().then(() => {
                expect(selectComponentInstance.ngModel)
                  .toEqual([ 1, 2 ], 'did not init ngModel');

                testInstance.personIds = [ 1 ];

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponentInstance.ngModel)
                      .toEqual([ 1 ], 'did not update ngModel')
                });
            });

        }));

        it('should reset ngModel', async(() => {

            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            spyOn(selectComponentInstance, 'bindOptions');

            fixture.whenStable().then(() => {
                expect(selectComponentInstance.ngModel)
                  .toEqual([ 1, 2 ], 'did not init ngModel');

                selectComponentInstance.reset();

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponentInstance.ngModel)
                      .toEqual([ ], 'did not reset ngModel')
                });
            });

        }));

        it('should select and deselect value', async(() => {

            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            const event = <Event>jasmine.createSpyObj('event', ['stopPropagation']);

            expect(selectComponentInstance.multiple)
              .toBe(true, 'is not multiple');

            selectComponentInstance.onSelect(event, 3);

            expect(event.stopPropagation)
              .toHaveBeenCalled();

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(selectComponentInstance.ngModel)
                  .toEqual([ 1, 2, 3 ], 'did not update ngModel on select 3');

                selectComponentInstance.onSelect(event, 3);

                fixture.detectChanges();
                fixture.whenStable().then(() => {

                    expect(selectComponentInstance.ngModel)
                      .toEqual([ 1, 2 ], 'did not update ngModel on deselect 3');

                });

            });

        }));

        it('should bind options on options change', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            spyOn(selectComponentInstance, 'bindOptions').and.callThrough();

            testInstance.people.push({id: 4, name: 'Gary Cole'});

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(selectComponentInstance.bindOptions)
                  .toHaveBeenCalled();

                expect(selectComponentInstance.textByValue[4])
                  .toEqual('Gary Cole');

            });
        }));
    });
    describe('object', () => {

        let fixture: ComponentFixture<TestObjectComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MdlSelectModule.forRoot()],
                declarations: [TestObjectComponent],
            });

            TestBed.compileComponents().then( () => {
                fixture = TestBed.createComponent(TestObjectComponent);
                fixture.detectChanges();
            });
        }));

        it('should support ngModel', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            fixture.whenStable().then(() => {
                expect(selectComponentInstance.ngModel)
                  .toEqual( [{i: 1, n: 'Bryan Cranston'}, {i: 2, n: 'Aaron Paul'}], 'did not init ngModel');

                testInstance.personObjs = [{i: 1, n: 'Bryan Cranston'}];

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponentInstance.ngModel)
                      .toEqual( [{i: 1, n: 'Bryan Cranston'}], 'did not update ngModel')
                });
            });

        }));

        it('should reset ngModel', async(() => {

            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            spyOn(selectComponentInstance, 'bindOptions');

            fixture.whenStable().then(() => {
                expect(selectComponentInstance.ngModel)
                  .toEqual( [{i: 1, n: 'Bryan Cranston'}, {i: 2, n: 'Aaron Paul'}], 'did not init ngModel');

                selectComponentInstance.reset();

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(selectComponentInstance.ngModel)
                      .toEqual([ ], 'did not reset ngModel')
                });
            });

        }));

        it('should select and deselect value', async(() => {

            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            const event = <Event>jasmine.createSpyObj('event', ['stopPropagation']);

            let arrWith3Obj = [{i: 1, n: 'Bryan Cranston'}, {i: 2, n: 'Aaron Paul'}, {i: 3, n: 'Bob Odenkirk'}];

            expect(selectComponentInstance.multiple)
              .toBe(true, 'is not multiple');

            selectComponentInstance.onSelect(event, arrWith3Obj[2]);

            expect(event.stopPropagation)
              .toHaveBeenCalled();

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(selectComponentInstance.ngModel)
                  .toEqual( arrWith3Obj, 'did not update ngModel on select 3');

                selectComponentInstance.onSelect(event, arrWith3Obj[2]);

                fixture.detectChanges();
                fixture.whenStable().then(() => {

                    expect(selectComponentInstance.ngModel)
                      .toEqual( [arrWith3Obj[0], arrWith3Obj[1]], 'did not update ngModel on deselect 3');

                });

            });

        }));


        it('should bind options on options change', async(() => {

            let testInstance = fixture.componentInstance;
            let selectComponentInstance = fixture.debugElement.query(By.directive(MdlSelectComponent)).componentInstance;

            spyOn(selectComponentInstance, 'bindOptions').and.callThrough();

            testInstance.people.push({id: 4, name: 'Gary Cole'});

            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(selectComponentInstance.bindOptions)
                  .toHaveBeenCalled();

                expect(selectComponentInstance.textByValue[JSON.stringify({i: 4, n: 'Gary Cole'})])
                  .toEqual('Gary Cole');

            });
        }));
    });
});

@Component({
    selector: 'test-single-component',
    template: `
        <mdl-select [(ngModel)]="personId">
          <mdl-option *ngFor="let p of people" [value]="p.id">{{p.name}}</mdl-option>
        </mdl-select>
    `
})
class TestSingleComponent {
    personId: number = 1;
    people: any[] = [
        {id: 1, name: 'Bryan Cranston'},
        {id: 2, name: 'Aaron Paul'},
        {id: 3, name: 'Bob Odenkirk'},
    ];
}

@Component({
    selector: 'test-multiple-component',
    template: `
        <mdl-select [(ngModel)]="personIds" [multiple]="true">
          <mdl-option *ngFor="let p of people" [value]="p.id">{{p.name}}</mdl-option>
        </mdl-select>
    `
})
class TestMultipleComponent {
    personIds: number[] = [1, 2];
    people: any[] = [
        {id: 1, name: 'Bryan Cranston'},
        {id: 2, name: 'Aaron Paul'},
        {id: 3, name: 'Bob Odenkirk'},
    ];
}

@Component({
    selector: 'test-object-component',
    template: `
        <mdl-select [(ngModel)]="personObjs" [multiple]="true">
          <mdl-option *ngFor="let p of people" [value]="{ i: p.id, n: p.name }">{{p.name}}</mdl-option>
        </mdl-select>
    `
})
class TestObjectComponent {
    personObjs: any[] = [{i: 1, n: 'Bryan Cranston'}, {i: 2, n: 'Aaron Paul'}];
    people: any[] = [
        {id: 1, name: 'Bryan Cranston'},
        {id: 2, name: 'Aaron Paul'},
        {id: 3, name: 'Bob Odenkirk'},
    ];
}

