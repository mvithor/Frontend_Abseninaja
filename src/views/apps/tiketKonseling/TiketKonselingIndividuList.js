import BcTiketKonseling from "src/components/apps/tiketKonselingIndividu/BcTiketKonseling";
import PageContainer from "src/components/container/PageContainer";
import KonselingListing from "src/components/apps/tiketKonselingIndividu/KonselingListing";
import KonselingFilter from "src/components/apps/tiketKonselingIndividu/KonselingFilter";
import ChildCard from "src/components/shared/ChildCard";

const TiketKonselingIndividuList = () => {
    return (
        <PageContainer title="Data Pengajuan Konseling" description="Data Pengajuan Konseling">
            <BcTiketKonseling/>
            <ChildCard>
                <KonselingFilter/>
                <KonselingListing/>
            </ChildCard>
        </PageContainer>
    );
};

export default TiketKonselingIndividuList;