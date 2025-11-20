console.log ('Lets write Javascript');
async function main()
{
    let a=await fetch("https://www.youtube.com/watch?v=MlpG_JAcB2o"); 
    let response=await a.text();
    console.log(response)
}
function MediaDevice