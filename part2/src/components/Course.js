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

export default Course;