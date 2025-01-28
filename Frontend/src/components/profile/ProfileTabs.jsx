import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostGrid from "./PostGrid";

export default function ProfileTabs({ onTabChange, activeTab }) {
    return (
        <Tabs defaultValue="posts" onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="tagged">Tagged</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                <PostGrid active={activeTab} />
            </TabsContent>
            <TabsContent value="saved">
                <PostGrid active={activeTab} />
            </TabsContent>
            <TabsContent value="tagged">Tagged content</TabsContent>
        </Tabs>
    );
}
