import { useEffect, useState } from 'react';
import './tasks.css';
import { nanoid } from 'nanoid';

function showMesages(object)
{
    const meesage=new Toastify({
        text:object.message,
            backgroundColor:object.color,
            close:true,
            gravity:"top",
            duration: 3000,
            position: "center", // اتجاه الظهور: "left", "center" أو "right",
            color:"white"
    });
    meesage.showToast();
}
function Tasks()
{
    const [tasks,setTasks]=useState([]);
    useEffect(()=>
    {
        console.log("the tasks is updating well")
    },[tasks]);
    useEffect(()=>
    {
        console.log("it's aftre each render");

    })

    function deleteTask(TaskIndex)
    {
        let taskSNew=[...tasks];
        taskSNew.splice(TaskIndex,1);
        window.setTimeout(()=>
        {
            showMesages({message:"the task is deleted sucessfully",color:"red"});
            window.setTimeout(()=>
            {
                setTasks(taskSNew);
            },2000);
        },1500);
    }
    function upadateTaskShowContent(e)
    {
        e.target.parentElement.parentElement.nextElementSibling.classList.add("d-block");
        e.target.parentElement.parentElement.nextElementSibling.classList.remove("d-none");
    }
    function closeUpdatingSection(e)
    {
        e.target.parentElement.classList.add("d-none");
        e.target.parentElement.classList.remove("d-block");
    }
    function updateDataContent(e)
    {
        // get eh einouts:
        const getContent=e.target.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.value;
        console.log("the content iss",getContent);
        // getg the content data:
        const getName=e.target.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.value;
        console.log("the name is",getName);
        if(!getContent&&!getName)
        {
            window.alert("you must enter the new task name or task content or both of them")
        }
        else
        {
            let indexOfArray=+e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("index");
            
            console.log("the index is",indexOfArray);
            let arrayNew=[...tasks];
            let object={taskName:arrayNew[indexOfArray].taskName,taskContent:arrayNew[indexOfArray].taskContent};
            if(getName)
            {
                object.taskName=getName;
            }
            if(getContent)
            {
                object.taskContent=getContent;
            }
            arrayNew[indexOfArray]=object;
            window.setTimeout(()=>
            {
                showMesages({message:"the task is updated sucessfully",color:"yellow"});
                window.setTimeout(()=>
                {
                    setTasks(arrayNew);
                },2000);
            },1500)
        }
    }
    return <>
    <nav>
    <h1>tasks for you</h1>
    </nav>
    <header style={{width:"100%"}}>
    <div className='row justify-content-center justify-content-md-around align-items-center align-content-center'>
    <div className='mt-1 taskName-adidng col-12 col-md-6'>
    <div className='row justify-content-center align-items-around align-content-between'>
    <label className='col-12 text-center' htmlFor='taskName'><h2>taskName</h2></label>
    <input type='text' id='taskName' className='taskName col-10 my-3'></input>
    </div>
    </div>
    <div className='mt-4 taskContent-adidng col-12 col-md-6'>
    <div className='row justify-content-center align-items-around align-content-between'>
    <label className='col-12 text-center' htmlFor='taskName'><h2>task Content</h2></label>
    <input type='text' id='taskContent' className='taskContent col-10 my-3'></input>
    </div>
    </div>
    <button className='col-8 my-5 ' onClick={()=>
    {
        console.log("heli i;m adding one");
    let getElementOfTaskName=document.querySelector(".taskName");
    let getValueOfTaskContent=document.querySelector(".taskContent");
    if(!getElementOfTaskName.value||!getValueOfTaskContent.value)
    {
        window.alert("you must  fill in the input task name and the input task content");
    }
    let object={};
    object.taskName=getElementOfTaskName.value;
    object.taskContent=getValueOfTaskContent.value;
    let newOne=[...tasks]
    console.log(newOne);
    newOne.push(object);
    
    window.setTimeout(()=>
    {
        let mesage=new Toastify({
            text:"the task is added sucessfully",
            backgroundColor:"green",
            close:true,
            gravity:"top",
            duration: 3000,
            position: "center", // اتجاه الظهور: "left", "center" أو "right",
            color:"white"
        });
        mesage.showToast();
        window.setTimeout(()=>
        {
            setTasks(newOne);
        },3000)
    },2000);
    }}>adding new task</button>
    </div>
  
    </header>
    <section className='vh-100'>
    {tasks.length===0?<h1 className='ui vh-100 text-center  d-flex flex-row justify-content-center'>there is no tasks to show</h1>:tasks.map((ele,index)=>
    {
        const {taskName,taskContent}=ele;
        return <>
        <article className="task" key={index} index={index}>
        <div className='one'>
        <h2 style={{textAlign:"center"}}>{taskName}</h2>
        <div className='icon'>
        <h3 className='px-4 pb-4'>{taskContent}</h3>
        <i className="fa-solid fa-arrow-down icon" style={{cursor:"pointer"}} onClick={(e)=>
            {
                if(e.target.classList.contains("fa-arrow-down"))
                {
                    e.target.parentElement.parentElement.nextElementSibling.classList.remove("d-none");
                    e.target.parentElement.parentElement.nextElementSibling.classList.add("d-block");
                    e.target.classList.remove("fa-arrow-down");
                    e.target.classList.add("fa-arrow-up");
                }
                else
                {
                    e.target.parentElement.parentElement.nextElementSibling.classList.add("d-none");
                    e.target.parentElement.parentElement.nextElementSibling.classList.remove("d-block");
                    e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.add("d-none");
                    e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.classList.remove("d-block");
                    e.target.classList.add("fa-arrow-down");
                    e.target.classList.remove("fa-arrow-up");
                }
              
            }
        }></i>
        </div>
        </div>
        <div className='two d-none'>
        <div className='row buttons'>
            <button className='btn btn-danger d-block col-10 col-md-5 my-2 mx-md-2' onClick={(e)=>
            {
                let index=e.target.parentElement.parentElement.parentElement.getAttribute("key");
                deleteTask(index);
                console.log("delete this task");
            }}>delete</button>
            <button className='btn btn-primary d-block col-10 col-md-5 my-2 mx-md-2' onClick={upadateTaskShowContent}>update</button>
        </div>
        </div>
        <div className="updating-section d-none position-relative" >
        <div className='update-name'>
        <div className='row justify-content-center align-items-cenetr'>
        <div className='col-10 col-md-5'>
        <h4 style={{textAlign:"center"}}>taskName:</h4>
        <div className='row justify-content-center'>
            <input type='text' className='col-10 mk'></input>
        </div>
        </div>
        <div className='col-10 col-md-5'>
        <h4 style={{textAlign:"center"}}>taskContent:</h4>
        <div className='row justify-content-center'>
            <input type='text' className='col-10 mm'></input>
        </div>
        </div>
        <button className='btn btn-warning col-6 my-3' onClick={updateDataContent}>change the data</button>
        </div>
        </div>
        <i class="fa-solid fa-xmark position-absolute top-0 end-0  mx-3 fs-2 text-danger" onClick={closeUpdatingSection}></i>
        </div>
        </article>
        </>
    })}
    </section>
    </>
}

export default Tasks;