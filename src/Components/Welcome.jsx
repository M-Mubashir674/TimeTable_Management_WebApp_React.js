import { Card } from 'antd';


const Welcome = ({user}) => {
  return (
    <div className="Welcome">
      <Card title="Welcome Note" bordered={false} hoverable
      style={{ width: '100%' }}
      cover={<img alt="Time Table" src={require("./topLogo.png")} />}>
      <p>We welcome {user} to our application.</p>
      <p>You can add, delete, update the timetable information here.</p>
      <p>Thanks for your attention.</p>
    </Card>
    </div>
  );
}

export default Welcome;
