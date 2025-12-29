import InviteFriends from '../../components/invite-friends';
import NewUserRequest from '../../components/new-user-request';
import DailyRequest from '../../components/daily-request';
import Activities from '../../components/activities';
import FAQ from '../../components/faq';
import { WebFListView } from '../../components/webf-listview';

/**
 * design figma link: https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App?node-id=28824-42024&t=6IxeoGDPoZ08pa6k-0
 */
export default function HomePage() {
  return (
    <WebFListView>
      <div className="min-h-screen pb-[100px]">
        <div className="max-w-md min-h-screen mx-auto pb-8 pt-4">
          <>
            <InviteFriends />
            <NewUserRequest />
            <DailyRequest />
            <Activities />

            <div className='h-[40px]'></div>
            <FAQ />
          </>
        </div>
      </div>
    </WebFListView>
  );
}

