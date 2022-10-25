const Header = ({ title }) => <h2>{title}</h2>;

const Content = ({ parts }) => {
    const rows = parts.map(({name, exercises, id}) => <tr key={id}><th>{name}</th><td>{exercises}</td></tr>);
    const totalExercises = parts.reduce((acc, curr) => { 
      return acc + curr.exercises 
    }, 0);
    // let totalExercises = 0;
    // parts.forEach(part => totalExercises += part.exercises);
    return (
      <table>
        <tbody>
          {rows}
          <tr><th>Total: </th><td>{totalExercises}</td></tr>
        </tbody>
      </table>
    )
};

const Course = ({ course }) => {
  const { name: title, id, parts } = course;

  return (
    <>
      <Header title={title} />
      <Content parts={parts} />
    </>
  );
}


const App = () =>  {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const coursesList = courses.map(course => <Course key={course.id} course={course} />);


  return (
    <>
    <h1>Web development curriculum</h1>
      {coursesList}
    </>
  )
}

export default App;
