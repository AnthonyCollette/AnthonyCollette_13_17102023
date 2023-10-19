import chat from '../assets/img/icon-chat.png'
import feature from '../assets/img/icon-money.png'
import security from '../assets/img/icon-security.png'
import FeatureItem from './FeatureItem'

const Features = () => {

    const features = [{
        icon: chat, title: 'You are our #1 priority', text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
        icon: feature, title: 'More savings means higher rates', text: 'The more you save with us, the higher your interest rate will be!'
    }, {
        icon: security, title: 'Security you can trust', text: 'We use top of the line encryption to make sure your data and money is always safe.'
    }]

    return (
        <section className="features" >
            <h2 className="sr-only">Features</h2>
                {features.map((item, index) => (
                    <FeatureItem key={index} icon={item.icon} title={item.title} text={item.text} />
                ))}
        </section >
    );
};

export default Features;

