import React from 'react'
import Header from './Header'
import '../index.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from './Footer';

function BookScreen() {
    return (
        <>
            <Header
                headerTitle="My Library"
            />
            <div className="container">
                <button className="btn btn-primary"><ArrowBackIcon/> Back to books</button>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="bg-primary image mb-5"></div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 d-flex align-items-center">
                        <div>
                            <h1 className="mb-4">Title</h1>
                            <p className="mb-4">Et dolor amet eum takimata nonumy sea accusam sed sed veniam tation invidunt dolor. Diam erat sed duo ex in euismod rebum consetetur ipsum ipsum te accusam suscipit kasd diam lorem dolore. Dolores volutpat ipsum clita sit duo sit sadipscing consequat lorem hendrerit kasd magna sed feugiat sit. Et nam amet nonummy no kasd voluptua nulla diam duis consequat ut dolores magna aliquyam. In clita nihil eirmod duo sit amet. Eirmod nonumy labore magna dolore et sed nulla ullamcorper ut ad sanctus tempor adipiscing. Invidunt sadipscing diam. Velit consectetuer sea et et. Odio nonumy ea justo takimata sanctus. Sed delenit magna et dolore consequat magna clita rebum. Et sed consequat lorem dolor aliquyam invidunt sit sit duis amet te dolores vero in et nulla diam sed. Diam duo duo et et elitr amet. Ipsum accusam eos sanctus sed suscipit et diam labore takimata wisi.</p>
                            <p>Publish date: <span className="text-muted">23/4/19</span></p>
                            <p className="text-muted mb-5">16 pages</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h2>Excerpt</h2>
                    <p>Takimata gubergren lorem. Elit clita sea magna et erat sed praesent dolore nisl takimata erat amet ut nibh sit dolore elitr. Nulla hendrerit duo erat sea nihil kasd dolores accusam. Ipsum consectetuer takimata at dolore nostrud eu sadipscing mazim lorem. Dolore diam no ipsum sed nonummy ipsum in nonumy eum volutpat ea lorem ipsum elitr.\nLorem ipsum aliquam facilisis labore ea rebum vero amet vel dolores. Labore ipsum eirmod eos dolor amet amet gubergren vel dolore et stet dolore amet sanctus lorem enim laoreet rebum. Dolor sed tempor diam justo enim magna vero. Accumsan voluptua sit ut consequat velit sadipscing facilisis gubergren sea dolor. Soluta duo dolores ipsum ut lorem nisl sadipscing gubergren. Imperdiet est sea gubergren voluptua dolor duis est quis rebum sed augue. Lorem accusam sed lorem dolore clita ullamcorper. Wisi veniam et no kasd gubergren odio magna facilisis at ex suscipit ea autem at.\nUt et sit est stet aliquam diam eirmod sed amet. In sit elitr dolore duo et magna. Velit erat consetetur ea clita vero amet. Sit no eos sadipscing amet consectetuer clita no nulla erat tempor ipsum. Elitr et commodo ea sanctus. Facilisis invidunt et tempor dolor praesent dolore accusam diam. Ipsum wisi aliquyam clita tempor ex erat lorem justo vel elitr nisl et luptatum assum erat sed. Consectetuer iusto tincidunt et. Est et dolore et accusam et vel rebum lorem veniam amet magna sit voluptua. Dignissim eros sit stet sit accusam doming. Ipsum diam praesent eos dolor sed eirmod gubergren ea at stet id sed molestie vero sea aliquip feugait. Diam sed et labore sadipscing facilisi. Dolor et diam erat ut ut no ea feugiat eirmod eos lorem est invidunt gubergren liber justo. Et dolore aliquip et ipsum in et tempor duo illum ea et lorem vero lorem sit gubergren dolores. Qui in amet consectetuer. Takimata invidunt cum invidunt ipsum labore esse est vel magna vero amet erat justo lorem et blandit.\nAt sit veniam cum. Amet diam diam sadipscing aliquam lorem dolore nisl kasd no diam sit labore consetetur gubergren lorem. Euismod ut iusto delenit ipsum clita gubergren dolor gubergren dolor sit consetetur dolore elitr ad. Eirmod invidunt sed sea elitr eu dolore dolore et. Sit elitr ipsum. Tincidunt lorem cum sed at. Aliquyam qui ea diam vel. Minim dolor et sit duo labore vel adipiscing wisi ut qui diam elitr. Eos sed dolor duo. Duo sadipscing sanctus duis vel dolore vel ut lobortis erat. Accusam accusam elitr erat eirmod sit. Quod ipsum erat. Eirmod elitr dolor et. Amet erat et facilisi at dolor elitr praesent nisl takimata et tempor iusto sed dolore vero rebum. Odio rebum lorem sit facilisi voluptua sadipscing. Dolore sanctus no dolore rebum autem feugiat veniam ut vero diam rebum sadipscing eos consequat et amet ipsum. Stet invidunt ipsum feugiat invidunt diam nulla diam diam ea laoreet erat doming. Vero et est exerci sed consetetur odio diam erat duis takimata et lorem duo vel et takimata. Dolor sanctus aliquyam lorem.\nEos molestie sit laoreet lorem sit vel dolor. Lorem duo sea elitr ut volutpat ipsum euismod dolore et elitr eos dolor et vero. Vero hendrerit iusto sed ipsum labore dolor eirmod nulla dolor clita eros labore facilisi. Lorem est ipsum lorem lorem eirmod. Et sit facilisi clita nostrud lobortis invidunt. Et gubergren magna no rebum. No et facilisi zzril sadipscing accusam amet adipiscing sanctus. Autem facilisis sea diam ea illum et diam at labore aliquip accusam est diam facer tempor. Stet facilisis justo tempor voluptua consetetur rebum nonumy rebum dolore et et duo dolor sanctus sit enim. Ipsum rebum gubergren et no dolores clita praesent. Lorem magna nonumy aliquyam gubergren sanctus aliquip vel et invidunt diam justo dignissim facilisis ullamcorper nonumy amet sea tempor. Invidunt et no diam elitr in eos elitr duis eirmod dolores at elitr rebum. Luptatum at dolor at ipsum illum ea esse takimata vero amet dolor lorem dolore gubergren gubergren gubergren. Sed consetetur amet nulla congue tempor ipsum labore. Et nobis volutpat ea sed tation ea sanctus ea ipsum et. Voluptua et autem. Esse te nonumy dolor esse velit erat at. Stet et ipsum invidunt autem rebum nam et dolores dolore. Et no nonumy diam.</p>
                </div>
            </div>
            <Footer
                linkText="Admin"
                path="/admin"
            />
        </>
    )
}

export default BookScreen
