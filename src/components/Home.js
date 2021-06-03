import ProductCard from './ProductCard';
import { RAS } from './RAS';
import { Category} from './SlickCarousel';


const Home = () => {

    return (
        <div >
            <RAS />
            <Category />
            <ProductCard />
        </div>
    );
}

export default Home;