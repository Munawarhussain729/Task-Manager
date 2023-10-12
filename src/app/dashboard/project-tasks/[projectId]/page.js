
import TasksHome from '@/pages/TasksHome'

function page({ params }) {

  return (
    <div>
      <TasksHome projectId={params?.projectId} />
    </div>
  )
}

export default page
