import { Task } from './model/TaskClass';



describe('Task', () => {

    let mockDate: Date;
    let task: Task;
    beforeAll(()=>{
        mockDate = new Date();
        task = new Task('coding');
    })

  it('should create a task with correct description', () => {
    expect(task.GetTaskDescription()).toBe('coding');
  });

  it('created task with a different description',() =>{
    
    expect(task.GetTaskDescription()).not.toBe('making food');
  })

  it('created task must not be done at the beginning', () => {
    
    expect(task.GetTaskCompletion()).toBeFalsy()
  })

  it('created task must be marked done when completed', () => {
    
    task.SetCompletion(true);
    expect(task.GetTaskCompletion()).toBeTruthy()
    task.SetCompletion(false);
  })

  it('created task must not be done at the beginning', () => {
    
    expect(task.GetTaskCompletion()).toBeFalsy()
  })

  it('Task must be created in the same day', () => {
    expect(task.GetDateAsKey()).toContain(`${mockDate.getDay()}`)
    expect(task.GetDateAsKey()).toContain(`${mockDate.getMonth()}`)
    expect(task.GetDateAsKey()).toContain(`${mockDate.getFullYear()}`)
  })
});