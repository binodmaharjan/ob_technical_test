import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import axios from 'axios';
import React from "react";
import { ROUTE_NAME } from "@/lib/routename";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    method: z.string().min(2).max(50),
    url: z.string().url(),
    body: z.union([
        z.string().min(1).refine((value) => {
          try {
            JSON.parse(value);
            return true;
          } catch {
            return false;
          }
        }, { message: "Body must be a valid JSON string." }),
        z.string().length(0), // Allow an empty string

      ]),
  })

function LLMMockPage() {
    const [ response, setResponse ] = React.useState<any>(null);
    // const form = useForm();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          method: "",
            url: "",
            body: "",
        },
      })

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
           if(data.method === 'GET'){
            const response = await axios.get(data.url);
            setResponse(JSON.stringify(response.data));

           }else if(data.method === 'POST'){
            const response = await axios.post(ROUTE_NAME.postRecommendations, JSON.parse(data.body));
            
            setResponse(JSON.stringify(response.data));
             
            }else{
                console.log('Invalid method');
            }
        }catch(e){
            console.log(e);
        }
    };
    return (
        <div className="flex flex-col gap-y-5">
            <h1>LLM Mock Page</h1>
            <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className="flex flex-row gap-1 ">

                    <FormField
                        control={form.control}
                        name="method"
                        render={({field}) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Method" />
                                </SelectTrigger>
                                <SelectContent {...field}>
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem value="POST">POST</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <FormField
                        
                        control={form.control}
                        name="url"
                        render={({field}) => (
                            <FormItem className="w-full">
                          
                                <FormControl>
                                    <Input    {...field} placeholder="Enter URL or paste text"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Send</Button>
                </div>
                <div className="flex flex-col gap-y-5">
                    <Label className="text-start">Body</Label>
                    <FormField
                        control={form.control}
                        name="body"
                        render={({field}) => (<>
                         <FormItem className="w-full">
                            <FormControl>
                                <Textarea className="w-[500px] h-[200px]" {...field}></Textarea>
                               
                            </FormControl>
                             <FormMessage />
                             </FormItem>
                             </>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-y-5">
                    <Label className="text-start">Response</Label>
                    <Textarea className="w-[500px] h-[200px]" value={response}></Textarea>
                </div>
                </form>
            </Form>

        </div>
    );
}

export default LLMMockPage;