import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HomeView from './index';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('HomeView', () => {

    it('Renders HomeView without crashing', () => {
        shallow(<Provider store={store}><HomeView /></Provider>);
    });

    it('Renders add button, collection dropdown, infinite scroll', () => {
        const wrapper = mount(<Provider store={store}><HomeView /></Provider>);
         
        expect(wrapper.find(`button`).first().text()).toBe("Add New +");
        expect(wrapper.find(`.infinite-scroll-component`)).toHaveLength(1);
    });
});
  