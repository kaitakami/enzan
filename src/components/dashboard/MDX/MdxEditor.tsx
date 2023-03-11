import TextEditor from './TextEditor';
import MdxPreview from './MdxPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const MdxEditor: React.FC<{ state: string, handleState: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, name: string, placeholder: string }> = ({ state, handleState, name, placeholder }) => {
  return (
    <div>
      <Tabs defaultValue="editor" className="dark:bg-slate-800 min-h-[400px] rounded-lg p-2 bg-slate-100 mx-auto">
        <TabsList>
          <TabsTrigger value="editor">Editar</TabsTrigger>
          <TabsTrigger value="preview">Previa</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className='h-[400px] overflow-y-auto'>
          <TextEditor value={state} handleChange={handleState} name={name} placeholder={placeholder} />
        </TabsContent>
        <TabsContent value="preview" className='h-[400px] overflow-y-auto'>
          <MdxPreview value={state} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MdxEditor;
