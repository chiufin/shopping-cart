import Loadable from 'react-loadable'
import PageSkeleton from '../components/Skeletons/PageSkeleton'

export const HomeContainer = Loadable({
  loader: () => import(/* webpackChunkName: "home", webpackPrefetch: true */ './HomeContainer/HomeContainer'),
  loading: PageSkeleton,
  modules: ['home'],
})
